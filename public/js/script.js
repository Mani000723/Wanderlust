// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

// Chatbot Functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');

    // Toggle chatbot window
    chatbotToggle.addEventListener('click', function() {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
            chatbotInput.focus();
        }
    });

    // Close chatbot window
    chatbotClose.addEventListener('click', function() {
        chatbotWindow.classList.remove('active');
    });

    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message === '') return;

        // Add user message
        addMessage(message, 'user');
        chatbotInput.value = '';

        // Simulate bot response
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessage(botResponse, 'bot');
        }, 1000);
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const icon = document.createElement('i');
        icon.className = sender === 'bot' ? 'fas fa-robot' : 'fas fa-user';
        
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        
        messageContent.appendChild(icon);
        messageContent.appendChild(paragraph);
        messageDiv.appendChild(messageContent);
        
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Simple bot responses
    function getBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Common travel-related responses
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! I'm your WanderLust assistant. How can I help you plan your next adventure?";
        }
        
        if (message.includes('help') || message.includes('support')) {
            return "I can help you with travel planning, finding listings, booking accommodations, and answering questions about destinations. What would you like to know?";
        }
        
        if (message.includes('booking') || message.includes('reserve') || message.includes('book')) {
            return "To book a listing, simply browse through our available properties and click on the one you like. You can then contact the host or make a reservation directly.";
        }
        
        if (message.includes('listings') || message.includes('properties') || message.includes('accommodations')) {
            return "We have a wide variety of listings available! You can browse by location, price, or amenities. Would you like me to help you find something specific?";
        }
        
        if (message.includes('price') || message.includes('cost') || message.includes('expensive')) {
            return "Our listings range from budget-friendly options to luxury accommodations. Prices vary by location, amenities, and season. You can filter by price range when browsing.";
        }
        
        if (message.includes('location') || message.includes('where') || message.includes('place')) {
            return "We have listings in many popular destinations! You can search by city, country, or specific landmarks. Where are you thinking of traveling?";
        }
        
        if (message.includes('amenities') || message.includes('features') || message.includes('facilities')) {
            return "Our listings offer various amenities like WiFi, kitchen access, parking, and more. Each listing shows its specific amenities in the details.";
        }
        
        if (message.includes('contact') || message.includes('host') || message.includes('message')) {
            return "You can contact hosts directly through our messaging system. Just click on a listing and use the contact option to reach out to the host.";
        }
        
        if (message.includes('reviews') || message.includes('rating') || message.includes('feedback')) {
            return "All our listings have reviews from previous guests. You can read these to get a better idea of what to expect from each property.";
        }
        
        if (message.includes('cancel') || message.includes('refund') || message.includes('policy')) {
            return "Cancellation policies vary by listing and are clearly stated in each property's details. Most hosts offer flexible cancellation options.";
        }
        
        if (message.includes('thank') || message.includes('thanks')) {
            return "You're welcome! I'm here to help make your travel planning easier. Feel free to ask if you need anything else!";
        }
        
        if (message.includes('bye') || message.includes('goodbye')) {
            return "Goodbye! Have a wonderful trip and don't hesitate to reach out if you need help again!";
        }
        
        // Default response
        const defaultResponses = [
            "That's an interesting question! I'm here to help with travel-related queries. Could you be more specific about what you'd like to know?",
            "I'm your travel assistant! I can help with bookings, listings, travel tips, and more. What would you like to know about?",
            "I'm here to make your travel planning easier! Feel free to ask about listings, bookings, destinations, or any travel-related questions.",
            "I'd be happy to help! I can assist with finding accommodations, travel tips, booking information, and more. What can I help you with today?"
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    // Send message on button click
    chatbotSend.addEventListener('click', sendMessage);

    // Send message on Enter key
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Disable send button when input is empty
    chatbotInput.addEventListener('input', function() {
        chatbotSend.disabled = chatbotInput.value.trim() === '';
    });
});
