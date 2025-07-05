const validate = (formData: any, formDataSchema: any) => {
  const res = formDataSchema.safeParse(formData);

  if (res.success) {
    return undefined;
  }

  return res.error.format();
};

export default validate;
