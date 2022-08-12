import React, { PureComponent } from "react";
import Responsive from "react-responsive";

class DesktopLayout extends PureComponent {
	render() {
		return <Responsive {...this.props} minWidth={1241} />
	}
}

export default DesktopLayout;