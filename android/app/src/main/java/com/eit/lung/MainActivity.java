package com.eit.lung;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(USBPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
