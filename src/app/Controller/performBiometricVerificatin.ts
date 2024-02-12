import { BiometryType,NativeBiometric, NativeBiometricPlugin } from "capacitor-native-biometric";

export class PerformBiometricVerificatin {
    static async performBiometricVerificatin() {
        const result = await NativeBiometric.isAvailable();
        if (!result.isAvailable) return;
        const isFaceID = result.biometryType == BiometryType.FACE_ID;
        const verified = await NativeBiometric.verifyIdentity({
            reason: "For easy log in",
            title: "Log in",
            subtitle: "Maybe add subtitle here?",
            description: "Maybe a description too?",
        }).then(() => true).catch(() => false);
        if (!verified) return;
        const credentials = await NativeBiometric.getCredentials({
            server: "www.example.com",
        });
    }

    static setCredentials() {
        // Save user's credentials
        NativeBiometric.setCredentials({
            username: "username",
            password: "password",
            server: "www.example.com",
        }).then();
    }

    static deleteCredentials() {
        // Delete user's credentials
        NativeBiometric.deleteCredentials({
            server: "www.example.com",
        }).then();
    }
}