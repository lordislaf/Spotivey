export function createSettings(
    body, navigate
) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch("/api/create-settings", requestOptions)
      .then((response) => {
        if (!response.ok) {
      } else {
        return response.json();
      }
    })
    .then((data) => {
      console.log('Data saved')
      navigate('/user/settings', { state: { push: true } })
    })
}

export default function updateSettings(
    body, navigate
) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch("/api/update-settings", requestOptions)
      .then((response) => {
        if (!response.ok) {
      } else {
        return response.json();
      }
    })
    .then((data) => {
      console.log('Data update')
      navigate( '/user/settings', { state: { push: true } })
    })
  }