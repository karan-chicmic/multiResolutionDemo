import { _decorator, Component, Enum, Node, UITransform } from "cc";
const { ccclass, property } = _decorator;

enum fitModes {
    None,
    FitInside,
    FitWidth,
    FitHeight,
}

const cordinates = {
    width: 0,
    height: 0,
};

@ccclass("fitModeScript")
export class fitModeScript extends Component {
    fitMode: fitModes = fitModes.None;
    state: boolean = true;
    ratio = 0;

    @property({ type: Enum(fitModes) })
    set mode(val) {
        this.fitMode = val;
        console.log(this.fitMode);
        this.onaction(val);
    }
    get mode() {
        console.log("get fit mode", this.fitMode);
        return this.fitMode;
    }

    start() {}
    onaction(val: fitModes) {
        const parentWidth = this.getSize(this.node.parent).width;
        const parentHeight = this.getSize(this.node.parent).height;
        const childWidth = this.getSize(this.node).width;
        const childHeight = this.getSize(this.node).height;

        switch (this.fitMode) {
            case 1: {
                if (parentWidth < parentHeight) {
                    this.ratio = this.getFitWidthRatio(parentWidth, childWidth);
                    this.node.setScale(this.ratio, 1);
                    break;
                } else {
                    this.ratio = this.getFitHeightRatio(parentHeight, childHeight);
                    this.node.setScale(1, this.ratio);
                    break;
                }
            }
            case 2: {
                this.ratio = this.getFitWidthRatio(parentWidth, childWidth);
                this.node.setScale(this.ratio, 1);
                break;
            }
            case 3: {
                this.ratio = this.getFitHeightRatio(parentHeight, childHeight);
                this.node.setScale(1, this.ratio);
                break;
            }
        }
    }
    update(deltaTime: number) {}

    getSize(node: Node) {
        const width = node.getComponent(UITransform).width;
        const height = node.getComponent(UITransform).height;
        cordinates.width = width;
        cordinates.height = height;
        return cordinates;
    }

    getFitHeightRatio(parentHeight: number, childHeight: number) {
        return parentHeight / childHeight;
    }
    getFitWidthRatio(parentWidth: number, childWidth: number) {
        return parentWidth / childWidth;
    }
}
