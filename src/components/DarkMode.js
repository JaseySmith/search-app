import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';

function DarkModeToggle() {
  useEffect(() => {
    const checkbox = document.getElementById('checkbox');
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
      document.documentElement.setAttribute('data-theme', storedTheme);
      if (checkbox) {
        checkbox.checked = storedTheme === 'dark';
      }
    }

    if (checkbox) {
      checkbox.addEventListener('change', (e) => {
        const newTheme = e.target.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      });
    }
  }, []);

  return (
    <label id="toggle" htmlFor="checkbox">
      <input type="checkbox" id="checkbox" />
      <FontAwesomeIcon icon={faCircleHalfStroke} />
    </label>
  );
}

export default DarkModeToggle;
