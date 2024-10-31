const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const filterButton = document.getElementById('apply-filter');
const downloadButton = document.getElementById('download-photo');

upload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
        };
    }
});

filterButton.addEventListener('click', () => {
    applyOldSchoolFilter();
});

downloadButton.addEventListener('click', () => {
    downloadImage();
});

function applyOldSchoolFilter() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg * 1.1;       // Slight sepia tone
        data[i + 1] = avg * 0.95;
        data[i + 2] = avg * 0.82;

        let grain = Math.random() * 30 - 15;
        data[i] += grain;
        data[i + 1] += grain;
        data[i + 2] += grain;
    }
    ctx.putImageData(imageData, 0, 0);
}

function downloadImage() {
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg');
    link.download = 'vintage_photo.jpg';
    link.click();
}
