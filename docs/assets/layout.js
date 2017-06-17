$('#sidebar-content').sticky({
  context: '#sidebar-context'
});

$('#main nav a').on('click', function(event) {
  const selector = $(this).attr('href').replace(/^#/, '');

  document.getElementById(selector).scrollIntoView({
    behavior: 'smooth'
  });

  event.preventDefault();
});
