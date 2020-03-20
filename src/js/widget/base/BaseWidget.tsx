import * as React from "react";
import IBaseWidgetProps from "./IBaseWidgetProps";
import IBaseWidgetState from "./IBaseWidgetState";

export default abstract class BaseWidget<P extends IBaseWidgetProps, S extends IBaseWidgetState> extends React.Component<P, S>{
}
