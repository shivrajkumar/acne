import React, { lazy } from "react";
import Loader from "./Loader";

const InputAge = lazy(() => import("@/components/form/InputAge"));
const InputCheckbox = lazy(() => import("@/components/form/InputCheckbox"));
const InputEmail = lazy(() => import("@/components/inputComponents/InputEmail"));
// const InputImage = lazy(() => import("@/components/form/InputImage"));
const InputImage = lazy(() => import("@/components/form/liqaHautAi"));
const InputName = lazy(() => import("@/components/form/InputName"));
const InputPhoneNumber = lazy(() => import("@/components/form/InputPhoneNumber"));
const InputPhoneNumberV2 = lazy(() => import("@/components/form/InputPhoneNumberV2"));
const InputRadio = lazy(() => import("@/components/form/InputRadio"));
const InputSelect = lazy(() => import("@/components/form/InputSelect"));
const InputSlotsV4 = lazy(() => import("@/components/v4/InputSlots"));
const InputRadioV4 = lazy(() => import("@/components/v4/InputRadio"));
const InputRadioV2 = lazy(() => import("@/components/v4/InputRadioV2"));
const InputAgeV4 = lazy(() => import("@/components/v4/InputAge"));
const InputCheckboxV4 = lazy(() => import("@/components/v4/InputCheckbox"));
const IconInput = lazy(() => import("@/components/form/IconInput"));
const ImageCheckbox = lazy(() => import("@/components/form/ImageCheckbox"));
const SingleSelect = lazy(() => import("@/components/form/SingleSelect"));
const MultiSelect = lazy(() => import("@/components/form/MultiSelect"));

const _components = {
  inputAge: InputAge,
  inputCheckbox: InputCheckbox,
  inputEmail: InputEmail,
  inputImage: InputImage,
  inputName: InputName,
  inputPhoneNumber: InputPhoneNumber,
  inputRadio: InputRadio,
  inputSelect: InputSelect,
  inputSlotsV4: InputSlotsV4,
  inputRadioV4: InputRadioV4,
  inputRadioV2: InputRadioV2,
  inputAgeV4: InputAgeV4,
  inputCheckboxV4: InputCheckboxV4,
  iconInput: IconInput,
  imageCheckbox: ImageCheckbox,
  // miniInputSlots: InputSlotsV2,
  InputPhoneNumberV2: InputPhoneNumberV2,
  singleSelect: SingleSelect,
  multiSelect: MultiSelect,
};

const components = (block, context, handler, error) => {
  if (typeof _components[block?.component] !== "undefined") {
    return React.createElement(_components[block?.component], {
      key: block?.id,
      block: block,
      context: context,
      handler: handler,
      error: error,
    });
  }

  return React.createElement(
    () => (
      <div>
        <Loader />
      </div>
    ),
    { key: block?.id }
  );
};

export default components;
