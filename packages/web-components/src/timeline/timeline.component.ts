import { FASTSlider } from '@microsoft/fast-components';
import { attr, customElement, FASTElement } from '@microsoft/fast-element';
import { SegmentsTimelineComponent } from '..';
import { guid } from '../../../common/utils/guid';
import { ISegmentsTimelineConfig, SegmentsTimelineEvents } from '../segments-timeline/segments-timeline.definitions';
import { TimeRulerComponent } from '../time-ruler';
import { ITimeLineConfig, TimelineEvents } from './timeline.definitions';
import { styles } from './timeline.style';
import { template } from './timeline.template';

/**
 * Time Line component.
 * @public
 */
@customElement({
    name: 'media-timeline',
    template,
    styles
})
export class TimelineComponent extends FASTElement {
    @attr public id: string = guid();

    /**
     * The config of the time line.
     *
     * @public
     * @remarks
     * HTML attribute: config
     */
    @attr public config: ITimeLineConfig;

    /**
     * current time, indicate the current line time
     *
     * @public
     * @remarks
     * HTML attribute: current time
     */
    @attr public currentTime: number = 0;

    public readonly DAY_DURATION_IN_SECONDS = 86400; // 60 (sec) * 60 (min) * 24 (hours)

    public zoom: number = 1;

    private segmentsTimeline: SegmentsTimelineComponent;
    private timeRuler: TimeRulerComponent;
    private fastSlider: FASTSlider;

    private readonly SLIDER_DENSITY = 32;
    private readonly SLIDER_MAX_ZOOM = 22;

    public configChanged() {
        setTimeout(() => {
            this.initData();
        });
    }

    public currentTimeChanged() {
        if (this.segmentsTimeline) {
            this.segmentsTimeline.currentTime = this.currentTime;
        }
    }

    public connectedCallback() {
        super.connectedCallback();
        this.initData();
    }

    public initData() {
        if (!this.config) {
            return;
        }

        this.segmentsTimeline = <SegmentsTimelineComponent>(
            this.$fastController.element?.shadowRoot?.querySelector('media-segments-timeline')
        );
        this.timeRuler = <TimeRulerComponent>this.$fastController.element?.shadowRoot?.querySelector('media-time-ruler');

        // Disabling zoom on FireFox since we can't modify the scrollbar on FireFox
        if (navigator.userAgent.includes('Firefox')) {
            this.config.enableZoom = false;
        }

        if (this.config.enableZoom && !this.fastSlider) {
            /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
            this.fastSlider = document.createElement('fast-slider') as any;
            this.$fastController.element.shadowRoot.appendChild(this.fastSlider);
        } else if (!this.fastSlider) {
            this.$fastController.element.style.overflowX = 'hidden';
        }

        window.addEventListener('resize', () => {
            this.initTimeLine();
        });

        this.fastSlider?.addEventListener('change', () => {
            this.zoom = +this.fastSlider.value / this.SLIDER_DENSITY;
            this.initSegmentsTimeline();
            this.initTimeRuler();
        });

        this.initTimeLine();
    }

    private initTimeLine() {
        this.initSegmentsTimeline();
        this.initTimeRuler();
        setTimeout(() => {
            this.initSlider();
        }, 50);
    }

    private initSlider() {
        if (!this.config.enableZoom || !this.fastSlider) {
            return;
        }

        const boundingClientRect = this.$fastController.element.getBoundingClientRect();
        this.fastSlider.style.top = `${boundingClientRect.top + boundingClientRect.height - 20}px`;
        this.fastSlider.style.left = `${boundingClientRect.left + boundingClientRect.width - 93}px`;
        this.fastSlider.min = this.SLIDER_DENSITY;
        this.fastSlider.max = this.SLIDER_MAX_ZOOM * this.SLIDER_DENSITY;
        this.fastSlider.value = `${this.zoom * this.SLIDER_DENSITY}`;
    }

    private initSegmentsTimeline() {
        const config: ISegmentsTimelineConfig = {
            data: {
                segments: this.config?.segments,
                duration: this.DAY_DURATION_IN_SECONDS
            },
            displayOptions: {
                height: 25,
                barHeight: 12,
                top: 0,
                renderTooltip: false,
                renderProgress: false,
                zoom: this.zoom
            }
        };

        this.segmentsTimeline.config = config;

        this.segmentsTimeline.addEventListener(SegmentsTimelineEvents.SegmentClicked, ((event: CustomEvent) => {
            this.$emit(TimelineEvents.SEGMENT_CHANGE, event.detail);
            event.stopPropagation();
        }) as EventListener);

        this.segmentsTimeline.addEventListener(SegmentsTimelineEvents.CurrentTimeChanged, ((event: CustomEvent<number>) => {
            this.$emit(TimelineEvents.CURRENT_TIME_CHANGE, event.detail);
            event.stopPropagation();
        }) as EventListener);
    }

    private initTimeRuler() {
        this.timeRuler.startDate = this.config.date || new Date();
        this.timeRuler.zoom = this.zoom;
    }
}
