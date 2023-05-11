function displayFile() {
  var fileInput = document.getElementById('pdf_file');
  var file = fileInput.files[0];

  var fileReader = new FileReader();

  fileReader.onload = function(e) {
    var typedArray = new Uint8Array(e.target.result);

    // Load the PDF file using PDF.js
    PDFJS.getDocument(typedArray).then(function(pdf) {
      // Render the first page of the PDF to a canvas element
      pdf.getPage(1).then(function(page) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');

        var viewport = page.getViewport({ scale: 1 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        page.render(renderContext).promise.then(function() {
          // Append the canvas to the PDF viewer element
          var pdfViewer = document.getElementById('pdf-viewer');
          pdfViewer.innerHTML = '';
          pdfViewer.appendChild(canvas);
        });
      });
    });
  };

  fileReader.readAsArrayBuffer(file);
}