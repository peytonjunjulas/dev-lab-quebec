const deleteButton = document.querySelector('#delete-button')


deleteButton.addEventListener('click', _ => {
    fetch('/players', {
        method: 'delete',
        headers: { 'Content-Type': 'applications/json' },
        body: JSON.stringify({
            player: 'Peyton'
        })
    })
      .then(res => {
        if(res.ok) return res.json()
      })
      .then(response => {
        window.location.reload(false)
      })
})