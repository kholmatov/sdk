(function() {
  if (window.iBuildWidgetLoaded) return;
  window.iBuildWidgetLoaded = true;

  /**
   * Initialize the widget
   * @param {Object} options - Widget options
   * @param {string|HTMLElement} options.container - Selector or DOM element where to append the widget
   */
  function init(options = {}) {
    let container;

    // If a container is provided as an element
    if (options.container instanceof HTMLElement) {
      container = options.container;
    } 
    // If a container is provided as a string selector
    else if (typeof options.container === 'string') {
      container = document.querySelector(options.container);
    }

    // If container is not found, create a default floating container
    if (!container) {
      container = document.createElement('div');
      container.id = 'ibuild-widget-container';
      container.style.position = 'fixed';
      container.style.bottom = '20px';
      container.style.right = '20px';
      container.style.zIndex = '9999';
      document.body.appendChild(container);
    }

    // Inject styles
    const style = document.createElement('style');
    style.innerHTML = `
      .ibuild-widget {
        font-family: Arial, sans-serif;
        background: #ffffff;
        border: 1px solid #ccc;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        padding: 20px;
        border-radius: 8px;
        width: 300px;
      }
      .ibuild-widget__header {
        margin-top: 0;
        font-size: 18px;
        color: #333;
      }
      .ibuild-widget__button {
        display: inline-block;
        margin-top: 10px;
        padding: 10px 15px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      .ibuild-widget__button:hover {
        background-color: #0056b3;
      }
    `;
    document.head.appendChild(style);

    // Widget structure inside the container
    const widget = document.createElement('div');
    widget.className = 'ibuild-widget';
    widget.innerHTML = `
      <h3 class="ibuild-widget__header">iBuild Widget</h3>
      <div class="ibuild-widget__content">
        <p>This is your widget content.</p>
      </div>
      <button class="ibuild-widget__button">Click Me</button>
    `;

    // Append widget to the container
    container.appendChild(widget);

    // Add interaction logic
    const button = widget.querySelector('.ibuild-widget__button');
    button.addEventListener('click', function() {
      alert('Button clicked inside the widget!');
    });

    // Expose methods to interact with the widget
    window.iBuild = {
      destroy: function() {
        container.remove();
        window.iBuildWidgetLoaded = false;
        console.log('iBuild widget has been removed.');
      },
      show: function() {
        container.style.display = 'block';
      },
      hide: function() {
        container.style.display = 'none';
      },
      container: container, // for direct DOM access if needed
    };

    console.log('iBuild widget has been initialized.');
  }

  // Automatically initialize if no manual init is called (optional)
  document.addEventListener('DOMContentLoaded', function() {
    if (!window.iBuildAutoInit) {
      init(); // auto attach if no explicit init is called
    }
  });

  // Export the init function
  window.iBuildSDK = {
    init,
  };

})();
