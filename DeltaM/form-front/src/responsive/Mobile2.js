import React, { memo } from "react";
import Responsive from "react-responsive";

const MobileLayout = props => <Responsive maxWidth={1240} {...props} />

export default memo(MobileLayout);