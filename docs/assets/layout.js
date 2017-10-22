$('#sidebar-content').sticky({
  context: '#sidebar-context'
});

$('#main nav a').on('click', function(event) {
  const selector = $(this).attr('href').replace(/^#/, '');

  document.getElementById(selector).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  });

  setTimeout(() => {
    location.hash = '#'+selector;
  }, 1500)

  event.preventDefault();
});
