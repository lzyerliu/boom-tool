
/**
 * file download
 * @param data 
 * @param filename 
 * @param mine 
 * @param bom 
 */
const fileDownload = (data: any, filename: string, mine?: any, bom?: any) => {
  const bolbData = (typeof bom !== 'undefined') ? [bom, data] : [data];
  const blob = new Blob(bolbData, { type: mine || 'application/octet-stream' });
  // @ts-ignore
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE workaround for "HTML7007: One or more blob URLs were
    // revoked by closing the blob for which they were created.
    // These URLs will no longer resolve as the data backing
    // the URL has been freed."
    // @ts-ignore
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const blobUrl = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob);
    let a = document.createElement('a');
    a.style.display = 'none';
    a.href = blobUrl;
    a.setAttribute('download', filename);

    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof a.download === 'undefined') {
      a.setAttribute('target', '_blank');
    }

    document.body.appendChild(a);
    a.click();

    const timer = setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl)
      clearTimeout(timer);
    }, 500);
  }
}

export { fileDownload };
