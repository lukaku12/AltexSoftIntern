import { useCallback, useEffect, useMemo, useReducer } from 'react';
import {
  checkFormDirty,
  //  parseFormApiErrors
} from './FormLib.helpers';
import { useFormLibContext } from './FormLib.context';
import { formReducer, initFormReducer } from './FormLib.reducer';
import {
  // validationHandlers,
  ValidationStagesE,
} from './FormLib.validation';
import {
  ACTION_RESET_FORM,
  ACTION_SUBMIT_FORM,
  ACTION_SET_FORM_DIRTY,
  ACTION_SET_FIELD_VALUE,
  ACTION_SET_FIELD_TOUCHED,
  ACTION_SET_SUBMITTING_PROCESS,
  ACTION_SET_FORM_ERROR,
} from './FormLib.actions';

export const useFormLib = ({
  onReset,
  onSubmit,
  apiErrors,
  initialErrors,
  initialTouched,
  isValidInitial,
  hasResetOnSubmit,
  // rules = [],
  initialValues = {},
  isLoading = false,
}) => {
  const initialReducerProps = useMemo(
    () => ({ initialValues, initialErrors, initialTouched, isValidInitial }),
    [initialErrors, initialTouched, initialValues, isValidInitial]
  );

  const [formState, dispatchForm] = useReducer(formReducer, initialReducerProps, initFormReducer);
  const fieldNamesList = useMemo(() => Object.keys(formState.values), [formState.values]);

  /**
   * Setters
   */
  const setFieldError = (fieldName, fieldError) => {
    // TODO implement setter
    dispatchForm({ type: ACTION_SET_FORM_ERROR, payload: { fieldName, fieldError } });
  };

  const setAllErrors = () => {
    // TODO implement setter
  };

  const setGeneralErrors = () => {
    // TODO implement setter
  };

  const setIsApiErrors = () => {
    // TODO implement setter
  };

  const setFieldValue = (fieldName, fieldValue) =>
    dispatchForm({ type: ACTION_SET_FIELD_VALUE, payload: { fieldName, fieldValue } });

  const setFieldTouched = (fieldName, fieldTouched) => {
    dispatchForm({ type: ACTION_SET_FIELD_TOUCHED, payload: { fieldName, fieldTouched } });
  };

  const setSubmittingInProcess = isSubmittingInProcess => {
    dispatchForm({ type: ACTION_SET_SUBMITTING_PROCESS, payload: { isSubmittingInProcess } });
  };

  const setFormDirty = isDirty =>
    dispatchForm({ type: ACTION_SET_FORM_DIRTY, payload: { isDirty } });

  // TODO implement setter
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setFormValidationStatus = isValid => isValid;

  const setFormSubmission = () => dispatchForm({ type: ACTION_SUBMIT_FORM });

  const setFormInitial = useCallback(
    (nextState = initialValues) =>
      dispatchForm({
        type: ACTION_RESET_FORM,
        payload: { ...initialReducerProps, initialValues: nextState },
      }),
    [initialReducerProps, initialValues]
  );

  /**
   * Validation
   */
  const validateField = fieldName =>
    // fieldName, validateOn, fieldValue = formState.values[fieldName]
    {
      if (formState.values[fieldName] === '') {
        const fieldError = 'Field is required';
        setFieldError(fieldName, fieldError);
      } else if (
        formState.values[fieldName] !== '' &&
        formState.values[fieldName].toString().length < 3 &&
        fieldName !== 'age' &&
        fieldName !== 'email'
      ) {
        const fieldError = 'Enter few symbols';
        setFieldError(fieldName, fieldError);
      } else if (
        formState.values[fieldName] !== '' &&
        formState.values[fieldName].toString().length >= 99
      ) {
        const fieldError = 'Max length is 100 symbols';
        setFieldError(fieldName, fieldError);
      } else {
        const fieldError = null;
        setFieldError(fieldName, fieldError);
      }
    };

  const validateFormSubmission = () => {
    // TODO validate if form is valid
    let formIsValidated = false;

    if (formState.values.firstName === '') {
      const fieldErrorName = 'Field is required';
      setFieldError('firstName', fieldErrorName);
      formIsValidated = false;
    } else if (formState.values.firstName !== '' && formState.values.firstName.length < 3) {
      const fieldErrorName = 'Enter few symbols';
      setFieldError('firstName', fieldErrorName);
      formIsValidated = false;
    } else if (formState.values.firstName !== '' && formState.values.firstName.length >= 99) {
      const fieldErrorName = 'Max length is 99 symbols';
      setFieldError('firstName', fieldErrorName);
      formIsValidated = false;
    } else {
      const fieldError = null;
      setFieldError('firstName', fieldError);
      formIsValidated = true;
    }
    // last name
    if (formState.values.lastName === '') {
      const fieldErrorName = 'Field is required';
      setFieldError('lastName', fieldErrorName);
      formIsValidated = false;
    } else if (formState.values.lastName !== '' && formState.values.lastName.length < 3) {
      const fieldErrorName = 'Enter few symbols';
      setFieldError('lastName', fieldErrorName);
      formIsValidated = false;
    } else if (formState.values.lastName !== '' && formState.values.lastName.length >= 99) {
      const fieldErrorName = 'Max length is 100 symbols';
      setFieldError('lastName', fieldErrorName);
      formIsValidated = false;
    } else {
      const fieldError = null;
      setFieldError('lastName', fieldError);
      formIsValidated = true;
    }
    // website
    if (formState.values.website === '') {
      const fieldErrorName = 'Field is required';
      setFieldError('website', fieldErrorName);
      formIsValidated = false;
    } else if (formState.values.website !== '' && formState.values.website.length < 1) {
      const fieldErrorName = 'Enter at least 1 symbol';
      setFieldError('website', fieldErrorName);
      formIsValidated = false;
    } else if (formState.values.website !== '' && formState.values.website.length >= 20) {
      const fieldErrorName = 'Max length is 20 symbols';
      setFieldError('website', fieldErrorName);
      formIsValidated = false;
    } else {
      const fieldError = null;
      setFieldError('website', fieldError);
      formIsValidated = true;
    }
    // age
    if (formState.values.age === '') {
      const fieldErrorName = 'Field is required';
      setFieldError('age', fieldErrorName);
      formIsValidated = false;
    } else if (formState.values.age !== '' && formState.values.age < 18) {
      const fieldErrorName = 'Too young!';
      setFieldError('age', fieldErrorName);
      formIsValidated = false;
    } else if (formState.values.age !== '' && formState.values.age >= 99) {
      const fieldErrorName = 'Oppps,sorry!';
      setFieldError('age', fieldErrorName);
      formIsValidated = false;
    } else {
      const fieldError = null;
      setFieldError('age', fieldError);
      formIsValidated = true;
    }
    // email to do
    if (formState.values.email === '') {
      const fieldErrorName = 'Field is required';
      setFieldError('email', fieldErrorName);
      formIsValidated = false;
    } else if (formState.values.email !== '' && !formState.values.email.includes('@')) {
      const fieldErrorName = 'Incorrect format';
      setFieldError('email', fieldErrorName);
      formIsValidated = false;
    } else {
      const fieldError = null;
      setFieldError('email', fieldError);
      formIsValidated = true;
    }
    // country
    if (formState.values.country === '') {
      const fieldErrorName = 'Field is required';
      setFieldError('country', fieldErrorName);
      formIsValidated = false;
    } else if (formState.values.country !== '' && formState.values.country.length < 2) {
      const fieldErrorName = 'Enter at least 2 symbol';
      setFieldError('country', fieldErrorName);
      formIsValidated = false;
    } else if (formState.values.country !== '' && formState.values.country.length >= 30) {
      const fieldErrorName = 'Max length is 30 symbols';
      setFieldError('country', fieldErrorName);
      formIsValidated = false;
    } else {
      const fieldError = null;
      setFieldError('country', fieldError);
      formIsValidated = true;
    }
    // city
    if (formState.values.city === '') {
      const fieldErrorName = 'Field is required';
      setFieldError('city', fieldErrorName);
      formIsValidated = false;
    } else if (formState.values.city !== '' && formState.values.city.length < 2) {
      const fieldErrorName = 'Enter at least 2 symbol';
      setFieldError('city', fieldErrorName);
      formIsValidated = false;
    } else if (formState.values.city !== '' && formState.values.city.length >= 30) {
      const fieldErrorName = 'Max length is 30 symbols';
      setFieldError('city', fieldErrorName);
      formIsValidated = false;
    } else {
      const fieldError = null;
      setFieldError('city', fieldError);
      formIsValidated = true;
    }
    // catch phrase
    if (formState.values.catchPhrase === '') {
      const fieldErrorName = 'Field is required';
      setFieldError('catchPhrase', fieldErrorName);
      formIsValidated = false;
    } else if (formState.values.catchPhrase !== '' && formState.values.catchPhrase.length < 5) {
      const fieldErrorName = 'Enter at least 5 symbol';
      setFieldError('catchPhrase', fieldErrorName);
      formIsValidated = false;
    } else if (formState.values.catchPhrase !== '' && formState.values.catchPhrase.length >= 99) {
      const fieldErrorName = 'Max length is 100 symbols';
      setFieldError('catchPhrase', fieldErrorName);
      formIsValidated = false;
    } else {
      const fieldError = null;
      setFieldError('catchPhrase', fieldError);
      formIsValidated = true;
    }
    return formIsValidated;
  };

  /**
   * Handlers
   */
  const submitForm = () => {
    setFormSubmission();

    const isFormValid = validateFormSubmission();

    if (isFormValid) {
      setSubmittingInProcess(true);
      setIsApiErrors(false);

      onSubmit(formState.values);
    }
  };

  const handleReset = event => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    if (event && event.stopPropagation) {
      event.stopPropagation();
    }

    onReset?.();

    return setFormInitial();
  };

  const handleSubmit = event => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    if (event && event.stopPropagation) {
      event.stopPropagation();
    }

    return submitForm();
  };
  const handleBlur = fieldName => () => {
    setFieldError(fieldName, null);
    setAllErrors(fieldName, null);
    setFieldTouched(fieldName, true);
    validateField(fieldName, ValidationStagesE.BLUR);
  };

  const handleChange = fieldName => fieldValue => {
    setFieldValue(fieldName, fieldValue);
    setFormDirty(checkFormDirty(formState.values, initialValues));
    setFieldError(fieldName, null);
  };

  /**
   * Getters
   */
  const getFieldProps = fieldName => ({
    name: fieldName,
    value: formState.values[fieldName],
    onBlur: handleBlur(fieldName),
    onChange: handleChange(fieldName),
  });

  const getFieldMeta = fieldName => ({
    value: formState.values[fieldName],
    errors: formState.errors[fieldName],
    touched: formState.touched[fieldName],
  });

  const getFieldHelpers = fieldName => ({
    setValue: fieldValue => setFieldValue(fieldName, fieldValue),
    setError: fieldError => setFieldError(fieldName, fieldError),
    setTouched: fieldTouched => setFieldTouched(fieldName, fieldTouched),
  });

  useEffect(() => {
    if (!isValidInitial || formState.isSubmitted) {
      setFormValidationStatus(fieldNamesList.every(fieldName => !formState.errors[fieldName]));
    }
  }, [
    fieldNamesList,
    isValidInitial,
    formState.errors,
    formState.isSubmitted,
    setFormValidationStatus,
  ]);

  useEffect(() => {
    if (
      hasResetOnSubmit &&
      !isLoading &&
      !formState.isApiErrors &&
      formState.isSubmittingInProcess
    ) {
      setFormInitial();
    }

    if (!isLoading && formState.isApiErrors && formState.isSubmittingInProcess) {
      setSubmittingInProcess(false);
    }
  }, [
    isLoading,
    setFormInitial,
    hasResetOnSubmit,
    formState.isApiErrors,
    formState.isSubmittingInProcess,
  ]);

  return {
    ...formState,
    apiErrors,
    initialErrors,
    initialValues,
    initialTouched,
    getFieldProps,
    getFieldMeta,
    getFieldHelpers,
    setFormDirty,
    setAllErrors,
    setFieldError,
    setFieldValue,
    setIsApiErrors,
    setFieldTouched,
    setFormSubmission,
    setGeneralErrors,
    setFormValidationStatus,
    submitForm,
    handleReset,
    handleSubmit,
    resetForm: setFormInitial,
  };
};

export const useField = fieldName => {
  const { getFieldMeta, getFieldProps, getFieldHelpers } = useFormLibContext();

  return [getFieldProps(fieldName), getFieldMeta(fieldName), getFieldHelpers(fieldName)];
};

export const useApiErrors = () =>
  // initialValues,
  // apiErrors,
  // setAllErrors,
  // setGeneralErrors,
  // setIsApiErrors
  {
    // TODO implement hook for api errors, that will parse errors and set it into form
  };
