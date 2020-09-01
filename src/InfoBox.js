import React from "react";
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, active, casesType, total, ...props }) {
  // TODO: try classNames or drop it

  //var classNames = require("classnames");
  // var buttonType = classNames({
  //   infoBox: true,
  //   "infoBox--cases": props.casesType == "cases",
  //   "infoBox--recovered": props.casesType == "recovered",
  //   "infoBox--deaths": props.casesType == "deaths",
  // });

  var buttonType = "infoBox ";

  if (active === true) buttonType += "infoBox--selected ";

  return (
    <Card onClick={props.onClick} className={buttonType}>
      {console.log(buttonType + "  --  " + casesType)}
      <CardContent>
        {/* Title */}
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        {/* Number of cases */}
        <h2 className="infoBox__cases">{cases}</h2>

        {/* Total */}
        <Typography className="infoBox__total" color="textSecondary">
          {total}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
