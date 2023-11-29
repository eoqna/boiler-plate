import axios from "axios";
import React, { useEffect } from "react";
import { useAppDispatch } from "../_reducers/hooks";
import { authUser } from "../_reducers/user_reducer";

export default function(SpecificComponent: () => JSX.Element, option: null | boolean, adminRoute = null) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(authUser());

  }, []);

  return SpecificComponent;
}