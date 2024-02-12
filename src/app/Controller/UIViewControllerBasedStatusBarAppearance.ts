import { Injectable } from '@angular/core';
import * as $ from 'jquery';

declare global {
    interface Document {
        mozCancelFullScreen?: () => Promise<void>;
        msExitFullscreen?: () => Promise<void>;
        webkitExitFullscreen?: () => Promise<void>;
        mozFullScreenElement?: Element;
        msFullscreenElement?: Element;
        webkitFullscreenElement?: Element;
        webkitIsFullScreen: Element,
    }

    interface HTMLElement {
        msRequestFullscreen?: () => Promise<void>;
        mozRequestFullscreen?: () => Promise<void>;
        webkitRequestFullscreen?: () => Promise<void>;
    }
}

@Injectable({
    providedIn: 'root'
})
export class UIViewControllerBasedStatusBarAppearance {
    isfullscreen: boolean = false;
    openfullscreen() {
        window.addEventListener('keydown', (e) => {
            console.log(`key down: ${e.key}`);
            if (e.key === 'Escape'){
                return false;
            }
            return true;
        });
        window.addEventListener('keyup', (e) => {
            console.log(`key up: ${e.key}`);
            if (e.key === 'Escape'){
                return false;
            }
            return true;
        });
        window.addEventListener('keypress', (e) => {
            console.log(`key press: ${e.key}`);
            if (e.key === 'Escape'){
                return false;
            }
            return true;
        });
        // Trigger fullscreen
        const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
            mozRequestFullScreen(): Promise<void>;
            webkitRequestFullscreen(): Promise<void>;
            msRequestFullscreen(): Promise<void>;
        };
        if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
            docElmWithBrowsersFullScreenFunctions.requestFullscreen();
        } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
            docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
        } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
        } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
            docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
        }
        this.isfullscreen = true;
    }

    closefullscreen() {
        const docWithBrowsersExitFunctions = document as Document & {
            mozCancelFullScreen(): Promise<void>;
            webkitExitFullscreen(): Promise<void>;
            msExitFullscreen(): Promise<void>;
        };
        if (docWithBrowsersExitFunctions.exitFullscreen) {
            docWithBrowsersExitFunctions.exitFullscreen();
        } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
            docWithBrowsersExitFunctions.mozCancelFullScreen();
        } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            docWithBrowsersExitFunctions.webkitExitFullscreen();
        } else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
            docWithBrowsersExitFunctions.msExitFullscreen();
        }
        this.isfullscreen = false;
    }
}
