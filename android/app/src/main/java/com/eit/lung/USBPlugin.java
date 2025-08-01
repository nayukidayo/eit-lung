package com.eit.lung;

import android.util.Log;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "usb")
public class USBPlugin extends Plugin {
    private USB usb;
    private static final String TAG = "QQQ";

    @Override
    public void load() {
        usb = new USB(getContext());
    }

    @PluginMethod()
    public void start(PluginCall call) {
        Integer mode1 = call.getInt("mode1");
        Integer mode2 = call.getInt("mode2");
        Integer freq = call.getInt("freq");
        if (mode1 == null || mode2 == null || freq == null) {
            call.reject("invalid parameters");
            return;
        }
        DataCallback dataCallback = new DataCallback() {
            @Override
            public void ok(short[] shorts) {
                JSObject ret = new JSObject();
                ret.put("data", JSArray.from(shorts));
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
                usb.start(mode1, mode2, freq, dataCallback);
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
