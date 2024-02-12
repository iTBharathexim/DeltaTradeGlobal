import { Plugin, WebPlugin, registerPlugin } from "@capacitor/core";

// we can take advantage of TypeScript here!
interface NativePluginInterface extends WebPlugin {
  NativeMethod: () => Promise<Record<"Uninstall", string>>;
  NotifyListeners: () => Promise<void>;
};

// it's important that both Android and iOS plugins have the same name
export const IonicNativePluginExample = registerPlugin<NativePluginInterface>("IonicNativePlugin");
