import { css } from '@microsoft/fast-element';
import { stylesShaka } from './shaka-controls.style';

export const styles = css`
    :host {
        display: inline-block;
        background: none;
        width: 100%;
        font-family: var(--font-family);
        --neutral-fill-rest: none;
        --density: 4;
        --design-unit: 2;
        --base-height-multiplier: 12;
        height: auto;
        padding-bottom: calc(48px + 43px);
    }

    ${stylesShaka}

    .shaka-video-container {
        position: relative;
        top: 0;
        left: 0;
        display: flex;
    }

    .shaka-bottom-controls {
        padding: 8px 0;
    }

    .shaka-video-container.live .shaka-fast-forward-button,
    .shaka-video-container.live .shaka-rewind-button {
        display: none;
    }

    .shaka-video-container.vod .shaka-seek-bar-container {
        display: none;
    }

    .shaka-video-container .material-icons-round {
        font-size: 16px;
    }

    .shaka-volume-bar-container {
        height: 2px;
        border-radius: 0;
    }

    .live-button-component .control .content {
        font-weight: 600;
        padding: 0 6px;
    }

    .live-button-component.live-on {
        color: rgb(26 188 156);
        border: rgb(26 188 156) 1px solid;
    }

    .live-button-component.live-off {
        background: rgb(50 49 48);
        border: 1px solid rgb(50 49 48);
        color: rgb(121 119 117);
        margin: 0px 9px;
    }

    svg path {
        fill: #f3f2f1;
    }

    button {
        background: 0 0;
        border: none;
        display: flex;
    }

    .shaka-hidden {
        display: none !important;
    }

    video {
        width: 100%;
        height: 100%;
        background: black;
    }

    .upper-bounding {
        padding: 0 20px;
        height: 49px;
        background: #1a1a1a;
        align-items: center;
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: [camera-name] 90px [date-picker] auto;
    }

    .col.camera-name {
        grid-column-start: camera-name;
        grid-column-end: camera-name;
        grid-row-start: 1;
        grid-row-end: 1;
    }

    .col.date-picker {
        grid-column-start: date-picker;
        grid-column-end: date-picker;
        grid-row-start: 1;
        grid-row-end: 1;
        justify-self: end;
    }

    .date-picker .date-picker-component,
    .date-picker span {
        display: inline-block;
        vertical-align: middle;
        color: #f3f2f1;
    }
`;
