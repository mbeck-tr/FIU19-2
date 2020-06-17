document.getElementById('dateien').addEventListener(
    "change",
    handleFileSelected,
    false
);

function handleFileSelected(event) {
    let files = event.target.files
    let output = '';
    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        console.log(file);
        output += '<li>' +
            '<strong>' + file.name + '</strong>' +
            ' (' + (file.type || "n/a") + ') - ' +
            file.size + ' Bytes,' +
            file.lastModifiedDate.toLocaleDateString() +
            '</li>';

        let reader = new FileReader();
        if (file.type.match('text.*')) {
            reader.onload = (event) => {
                let span = document.createElement('span');
                span.innerHTML = reader.result;
                document.getElementById('list').insertBefore(span, null);
            }
            reader.readAsText(file);
        }else if (file.type.match('image.*')) {
            reader.onload = (event) => {
                let span = document.createElement('span');
                span.innerHTML = '<img class="thumbnail" src="' + reader.result + '"/>';
                document.getElementById('list').insertBefore(span,null);
            }
            reader.readAsDataURL(file);
        }
    }
    document.getElementById('list').innerHTML = '<ol>' + output + '</ol>';
}
