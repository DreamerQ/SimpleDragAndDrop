'use strict';
(function () {
    document.onmousedown = DragAndDrop;

    function DragAndDrop (e) {
        var target = e.target;

        var wrap = document.querySelector('.wrap');
        var wrapCoords = wrap.getBoundingClientRect();

        if ( !target.classList.contains('draggable') ) return;

        var shiftX, shiftY;

        startDrag(e.clientX, e.clientY);

        document.onmousemove = function(e) {
            console.log(e.clientX, e.clientY);
            moveAt(e.clientX, e.clientY);
        };

        document.onmouseup = function() {
            finishDrag();
        };
        //-------------------------------------------
        function startDrag(clientX, clientY) {

            shiftX = clientX - target.getBoundingClientRect().left;
            shiftY = clientY - target.getBoundingClientRect().top;

            target.style.position = 'fixed';
            target.classList.toggle('moving');

            document.body.appendChild(target);

            moveAt(clientX, clientY);
        }

        function finishDrag() {
            target.style.position = 'absolute';
            target.classList.toggle('moving');

            document.onmousemove = null;
            document.onmouseup = null;
        }

        function moveAt(clientX, clientY) {

            var newX = clientX - shiftX;
            var newY = clientY - shiftY;

            if (newY > wrapCoords.bottom - target.offsetHeight) newY = wrapCoords.bottom - target.offsetHeight;
            if (newY < wrapCoords.top) newY = wrapCoords.top;

            if (newX > wrapCoords.right - target.offsetWidth) newX = wrapCoords.right - target.offsetWidth;
            if (newX < wrapCoords.left) newX = wrapCoords.left;

            target.style.left = newX + 'px';
            target.style.top = newY + 'px';

        }

        return false;
    }
})();