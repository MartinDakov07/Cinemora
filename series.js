document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.video-preview').forEach(preview => {
    const iframe = preview.querySelector('iframe');
    const btn = preview.querySelector('.fullscreen-btn');

    function post(action) {
      if (!iframe || !iframe.contentWindow) return;

      iframe.contentWindow.postMessage(
        JSON.stringify({
          event: 'command',
          func: action,
          args: []
        }),
        '*'
      );
    }

    preview.addEventListener('mouseenter', () => {
      post('playVideo');
    });

    preview.addEventListener('mouseleave', () => {
      post('pauseVideo');
    });

    btn.addEventListener('click', e => {
      e.stopPropagation();

      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      }
    });
  });
});


