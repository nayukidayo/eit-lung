package com.eit.lung;

import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.hardware.usb.UsbDevice;
import android.hardware.usb.UsbDeviceConnection;
import android.hardware.usb.UsbInterface;
import android.hardware.usb.UsbManager;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;


import java.nio.ByteBuffer;
import java.nio.ByteOrder;

public class USB {
    private UsbInterface intf;
    private UsbDeviceConnection conn;
    private PermissionCallback permissionCallback;
    private TransferData transferData;

    private static final int pid = 4100;
    private static final int vid = 1204;
    private static final String ACTION_USB_PERMISSION = "com.eit.lung.ACTION_USB_PERMISSION";

    private final Context context;
    private final UsbManager manager;
    private final BroadcastReceiver receiver;

    public USB(Context context) {
        this.context = context;
        manager = (UsbManager) context.getSystemService(Context.USB_SERVICE);
        receiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context c, Intent intent) {
                String action = intent.getAction();
                if (ACTION_USB_PERMISSION.equals(action)) {
                    permissionCallback.call(intent.getBooleanExtra(UsbManager.EXTRA_PERMISSION_GRANTED, false));
                } else if (UsbManager.ACTION_USB_DEVICE_ATTACHED.equals(action)) {
                    Toast.makeText(context, "设备插入", Toast.LENGTH_SHORT).show();
                } else if (UsbManager.ACTION_USB_DEVICE_DETACHED.equals(action)) {
                    Toast.makeText(context, "设备拔出", Toast.LENGTH_SHORT).show();
                    close();
                }
            }
        };
        registerReceiver();
    }

    private void registerReceiver() {
        IntentFilter filter = new IntentFilter(ACTION_USB_PERMISSION);
        filter.addAction(UsbManager.ACTION_USB_DEVICE_ATTACHED);
        filter.addAction(UsbManager.ACTION_USB_DEVICE_DETACHED);
        ContextCompat.registerReceiver(context, receiver, filter, ContextCompat.RECEIVER_NOT_EXPORTED);
    }

    void open(OpenCallback callback) {
        if (conn != null) {
            callback.ok();
            return;
        }
        UsbDevice device = findDevice();
        if (device == null) {
            callback.err("not found device");
            return;
        }
        requestPermission(device, granted -> {
            if (granted) {
                Log.d("QQQ", "授权");
                intf = device.getInterface(0);
                conn = manager.openDevice(device);
                conn.claimInterface(intf, true);
                callback.ok();
            } else {
                callback.err("device permission denied");
            }
        });
    }

    void close() {
        stop();
        if (conn != null) {
            conn.releaseInterface(intf);
            conn.close();
            conn = null;
        }
    }

    @Nullable
    UsbDevice findDevice() {
        UsbDevice device = null;
        for (UsbDevice v : manager.getDeviceList().values()) {
            if (v.getProductId() == pid && v.getVendorId() == vid) {
                device = v;
                break;
            }
        }
        return device;
    }

    void requestPermission(UsbDevice device, PermissionCallback callback) {
        if (manager.hasPermission(device)) {
            callback.call(true);
            return;
        }
        permissionCallback = callback;
        Intent intent = new Intent(ACTION_USB_PERMISSION);
        intent.setPackage(context.getPackageName());
        PendingIntent permissionIntent = PendingIntent.getBroadcast(context, 0, intent, PendingIntent.FLAG_MUTABLE);
        manager.requestPermission(device, permissionIntent);
    }

    void start(int mode1, int mode2, int freq, DataCallback callback) {
        transfer(mode1, 512);
        transfer(mode2, 512);
        transfer(freq, 512);
        transferData = new TransferData(freq, callback);
        transferData.start();
    }

    void stop() {
        if (transferData != null) {
            transferData.stopRun();
            transferData = null;
        }
    }

    private short[] transfer(int outSize, int inSize) {
        byte[] buf = new byte[outSize];
        conn.bulkTransfer(intf.getEndpoint(0), buf, buf.length, 0);
        buf = new byte[inSize];
        conn.bulkTransfer(intf.getEndpoint(1), buf, buf.length, 0);
        short[] shorts = new short[inSize / 2];
        ByteBuffer.wrap(buf).order(ByteOrder.LITTLE_ENDIAN).asShortBuffer().get(shorts);
        return shorts;
    }

    private class TransferData extends Thread {
        private Boolean running = true;
        private static final int inSize = 416;
        private final int outSize;
        private final DataCallback callback;

        public TransferData(int outSize, DataCallback callback) {
            this.outSize = outSize;
            this.callback = callback;
        }

        @Override
        public void run() {
            while (running && conn != null) {
                try {
                    callback.ok(transfer(outSize, inSize));
                } catch (Exception e) {
                    callback.err(e.toString());
                }
            }
        }

        public void stopRun() {
            running = false;
        }
    }
}
