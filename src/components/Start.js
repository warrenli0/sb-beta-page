import './Start.css'
import Choose from './start-comps/Choose';
import { useState, useEffect } from "react";

export default function Start({showLP}) {

    if (!showLP) {
        return (
            <Choose />
        )
    }
};
  