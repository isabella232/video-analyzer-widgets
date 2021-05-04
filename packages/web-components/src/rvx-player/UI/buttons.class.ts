import {
    FORWARD_SVG_PATH,
    FULL_OFF_PATH,
    FULL_PATH,
    METADATA_PATH,
    MUTE_PATH,
    ON_PATH,
    OVERFLOW_MENU_PATH,
    REWIND_SVG_PATH
} from '../../../../styles/svg/svg.shapes';

/* eslint-disable @typescript-eslint/no-explicit-any */
const shaka = require('shaka-player/dist/shaka-player.ui.debug.js');

export class PlayButton extends shaka.ui.PlayButton {
    private svg: SVGSVGElement;
    private path: SVGPathElement;
    private readonly PATH_PLAY = 'm4 1.336 10.664 6.664-10.664 6.664zm1.336 2.406v8.516l6.813-4.258z';
    private readonly PATH_PAUSE = 'M10 2h1.5v12h-1.5v-12zM4.5 14v-12h1.5v12h-1.5z';
    public constructor(parent: any, controls: any) {
        super(parent, controls);
        this.init();
    }

    public updateIcon() {
        if (this.isPaused()) {
            this.path.setAttribute('d', this.PATH_PLAY);
        } else {
            this.path.setAttribute('d', this.PATH_PAUSE);
        }
    }

    private init() {
        // Create SVG
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.path.setAttribute('fill', 'black');
        this.svg.appendChild(this.path);
        this.button.appendChild(this.svg);
        this.updateIcon();
    }
}

export class ForwardButton extends shaka.ui.FastForwardButton {
    public constructor(parent: any, controls: any) {
        super(parent, controls);
        this.init();
    }

    private init() {
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.path.setAttribute('fill', 'black');
        this.path.setAttribute('d', FORWARD_SVG_PATH);
        this.svg.appendChild(this.path);
        this.button_.innerText = '';
        this.button_.appendChild(this.svg);
    }
}

export class RewindButton extends shaka.ui.RewindButton {
    public constructor(parent: any, controls: any) {
        super(parent, controls);
        this.init();
    }

    private init() {
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.path.setAttribute('fill', 'black');
        this.path.setAttribute('d', REWIND_SVG_PATH);
        this.svg.appendChild(this.path);
        this.button_.innerText = '';
        this.button_.appendChild(this.svg);
    }
}

export class FullscreenButton extends shaka.ui.FullscreenButton {
    private svg: SVGSVGElement;
    private path: SVGPathElement;

    public constructor(parent: any, controls: any) {
        super(parent, controls);
        this.init();
    }

    public updateIcon_() {
        this.button_.innerText = '';
        this.button_.appendChild(this.svg);
        if (document.fullscreenElement) {
            this.path.setAttribute('d', FULL_PATH);
        } else {
            this.path.setAttribute('d', FULL_OFF_PATH);
        }
    }

    private init() {
        // Create SVG
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.path.setAttribute('fill', 'black');
        this.svg.appendChild(this.path);
        this.updateIcon_();
    }
}

export class MuteButton extends shaka.ui.MuteButton {
    private svg: SVGSVGElement;
    private path: SVGPathElement;

    public constructor(parent: any, controls: any) {
        super(parent, controls);
        this.init();
    }

    public updateIcon_() {
        const path = this.ad ? (this.ad.isMuted() ? MUTE_PATH : ON_PATH) : this.video.muted ? MUTE_PATH : ON_PATH;
        this.button_.innerText = '';
        this.button_.appendChild(this.svg);
        this.path.setAttribute('d', path);
    }

    private init() {
        // Create SVG
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.path.setAttribute('fill', 'black');
        this.svg.appendChild(this.path);
        this.updateIcon_();
    }
}

export class OverflowMenu extends shaka.ui.OverflowMenu {
    private svg: SVGSVGElement;
    private path: SVGPathElement;

    public constructor(parent: any, controls: any) {
        super(parent, controls);
        this.init();
    }

    private init() {
        // Create SVG
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.path.setAttribute('fill', 'black');
        this.path.setAttribute('d', OVERFLOW_MENU_PATH);
        this.svg.appendChild(this.path);
        this.overflowMenuButton_.innerText = '';
        this.overflowMenuButton_.appendChild(this.svg);
    }
}

export class LiveButton extends shaka.ui.Element {
    private isLive = true;
    public constructor(parent: any, controls: any, private callBack: (isLive: boolean) => void) {
        super(parent, controls);
        this.init();
    }

    private init() {
        this.button_ = document.createElement('fast-button');
        this.button_.innerHTML = '<b>LIVE</b>';
        this.button_.classList.add('live-button-component');
        this.button_.classList.add('live-on');
        this.parent.appendChild(this.button_);

        this.eventManager.listen(this.button_, 'click', () => {
            this.isLive = !this.isLive;
            this.callBack(this.isLive);
        });
    }
}

export class BodyTracking extends shaka.ui.Element {
    private isOn = false;

    public constructor(parent: any, controls: any, private callBack: (isOn: boolean) => void) {
        super(parent, controls);
        this.init();
    }

    public updateIcon_() {
        if (this.isOn) {
            this.path.style['fill'] = 'red';
        } else {
            this.path.style['fill'] = 'white';
        }
    }

    private init() {
        this.button_ = document.createElement('fast-button');
        // Create SVG
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        this.path.setAttribute('d', METADATA_PATH);
        this.svg.appendChild(this.path);
        this.button_.appendChild(this.svg);
        this.parent.appendChild(this.button_);
        this.updateIcon_();
        this.eventManager.listen(this.button_, 'click', () => {
            this.isOn = !this.isOn;
            this.updateIcon_();
            this.callBack(this.isOn);
        });
    }
}
