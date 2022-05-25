export const generateInput = (name: string, message: string) => {
  return (defaultAnswer: string): any => ({
    type: 'input',
    name,
    message,
    default: defaultAnswer,
  });
};
