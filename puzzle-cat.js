function initializePuzzle() {
    imageSwap();
    setupDragAndDrop();
}

function imageSwap() {
    var images = document.querySelectorAll('.random');
    var srcs = [
        'image_part_001.jpg',
        'image_part_002.jpg',
        'image_part_003.jpg',
        'image_part_004.jpg',
        'image_part_005.jpg',
        'image_part_006.jpg',
        'image_part_007.jpg',
        'image_part_008.jpg',
        'image_part_009.jpg',
    ];
    srcs.sort(() => Math.random() - 0.5);
    images.forEach((img, i) => img.src = srcs[i]);
}

function setupDragAndDrop() {
    const puzzlePieces = document.querySelectorAll('.puzzle-piece');

    puzzlePieces.forEach(piece => {
        piece.addEventListener('dragstart', dragStart);
        piece.addEventListener('dragover', dragOver);
        piece.addEventListener('drop', drop);
        piece.addEventListener('dragenter', dragEnter);
        piece.addEventListener('dragleave', dragLeave);
    });
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.closest('.puzzle-piece').id);
}

function dragEnter(e) {
    e.preventDefault();
    e.target.closest('.puzzle-piece').classList.add('drag-over');
}

function dragLeave(e) {
    e.target.closest('.puzzle-piece').classList.remove('drag-over');
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const draggedElementId = e.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(draggedElementId);
    const dropTarget = e.target.closest('.puzzle-piece');

    if (draggedElement && dropTarget) {
        const tempImg = draggedElement.querySelector('img').src;
        draggedElement.querySelector('img').src = dropTarget.querySelector('img').src;
        dropTarget.querySelector('img').src = tempImg;
    }

    dropTarget.classList.remove('drag-over');

    checkPuzzleCompletion();
}

function checkPuzzleCompletion() {
    const correctOrder = [
        'image_part_001.jpg',
        'image_part_002.jpg',
        'image_part_003.jpg',
        'image_part_004.jpg',
        'image_part_005.jpg',
        'image_part_006.jpg',
        'image_part_007.jpg',
        'image_part_008.jpg',
        'image_part_009.jpg',
    ];

    const currentOrder = Array.from(document.querySelectorAll('.puzzle-piece img')).map(img => img.src.split('/').pop());

    if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
        setTimeout(() => {
            alert("good job my love ❤️");
            window.location.href = 'treasure-dog.html'; 
        }, 100);
    }
}