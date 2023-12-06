export const handleDisableStartDate = (currentDate: any, form: any) => {
  const endDate = form.getFieldsValue(true).endDate;
  if (endDate) {
    return currentDate && currentDate > endDate;
  }
  return false;
};

export const handleDisableEndDate = (currentDate: any, form: any) => {
  const startDate = form.getFieldsValue(true).startDate;
  if (startDate) {
    return currentDate && currentDate < startDate;
  }
  return false;
};
