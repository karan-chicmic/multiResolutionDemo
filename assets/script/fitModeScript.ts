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
    private fitMode;
    state: boolean = true;
    ratio = 0;

    @property({ type: Enum(fitModes) })
    modes: fitModes = Enum(fitModes).None;
    // @property({ type: Boolean })
    // set statex(val) {
    //     this.state = val;
    //     this.node.active = this.state;
    // }
    // get statex() {
    //     return this.state;
    // }
    @property({ type: Enum(fitModes) })
    set mode(val) {
        this.fitMode = val;
    }
    get mode() {
        return this.fitMode;
    }

    start() {
        const parentWidth = this.getSize(this.node.parent).width;
        const parentHeight = this.getSize(this.node.parent).height;
        const childWidth = this.getSize(this.node).width;
        const childHeight = this.getSize(this.node).height;
        console.log("parent", parentWidth, parentHeight);
        console.log("child", childWidth, childHeight);

        switch (this.modes) {
            case fitModes.FitHeight: {
                console.log("fit height");
                this.ratio = this.getFitHeightRatio(parentHeight, childHeight);
                this.node.setScale(1, this.ratio);

                break;
            }
            case fitModes.FitWidth: {
                console.log("fit width");
                this.ratio = this.getFitWidthRatio(parentWidth, childWidth);
                this.node.setScale(this.ratio, 1);
                break;
            }
            case fitModes.FitInside: {
                console.log("fit inside");
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
