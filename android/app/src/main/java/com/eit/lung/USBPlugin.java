package com.eit.lung;

import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.util.Arrays;

@CapacitorPlugin(name = "USB")
public class USBPlugin extends Plugin {
    private USB usb;
    private static final String TAG = "QQQ";

    @Override
    public void load() {
        usb = new USB(getContext());
    }

    @PluginMethod()
    public void open(PluginCall call) {
        Long value = call.getLong("productId");
        JSObject ret = new JSObject();
        if (value == null) {
            ret.put("value", "nulllllll");
        } else {
            ret.put("value", value.toString());
        }
        notifyListeners("open", ret);
        call.resolve(ret);
    }

    @PluginMethod()
    public void start(PluginCall call) {
        Integer mode0 = call.getInt("mode0");
        Integer mode1 = call.getInt("mode1");
        Integer freq = call.getInt("freq");
        if (mode0 == null || mode1 == null || freq == null) {
            call.reject("invalid parameters");
            return;
        }
        DataCallback dataCallback = new DataCallback() {
            @Override
            public void ok(short[] shorts) {
                JSObject ret = new JSObject();
                ret.put("data", Arrays.toString(shorts));
                notifyListeners("data", ret);
            }

            @Override
            public void err(String msg) {
                JSObject ret = new JSObject();
                ret.put("msg", msg);
                notifyListeners("error", ret);
            }
        };
        OpenCallback openCallback = new OpenCallback() {
            @Override
            public void ok() {
                usb.start(mode0, mode1, freq, dataCallback);
                call.resolve();
            }

            @Override
            public void err(String msg) {
                Log.d("QQQ", msg);
                call.reject(msg);
            }
        };
        usb.open(openCallback);
    }

    @PluginMethod()
    public void stop(PluginCall call) {
        usb.stop();
        call.resolve();
    }
}
