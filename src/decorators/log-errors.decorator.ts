/** @format */

export function LogErrors() {
  return function (target: any, key: any, description: PropertyDescriptor) {
    const original = description.value;

    description.value = async function (...args: any[]) {
      const response = await original.apply(this, args);

      const { statusCode, message, req } = response;
      const path = req.protocol + "://" + req.get("host") + req.originalUrl;

      const output = {
        message: null,
        statusCode,
        path,
        method: String(key),
        class: target.name,
      };

      if (statusCode !== 200) {
        output.message = `SERVER ERROR: ${message}`;
      } else {
        output.message = `REQUEST SUCCESSFULLY PROCESSED`;
      }

      console.dir(output, { depth: false, colors: true });

      return response;
    };
  };
}
