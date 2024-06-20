export default (name: string, data: object, minify: boolean) => {
  const downloadLink = document.createElement("a");
  downloadLink.download = name;
  downloadLink.href =
    "data:text/json;charset=utf-8," +
    JSON.stringify(data, undefined, minify ? undefined : 2);
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();
};
