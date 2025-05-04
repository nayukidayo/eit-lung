package com.eit.lung;

interface OpenCallback {
    void ok();
    void err(String msg);
}

interface PermissionCallback {
    void call(Boolean granted);
}

interface DataCallback {
    void ok(short[] shorts);
    void err(String msg);
}
