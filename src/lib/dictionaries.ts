
export const dictionary = {
  en: {
    header: {
      newChat: "NEW CHAT",
      noChats: "No chat history.",
      noChatsFound: "No chats found."
    },
    welcome: {
      title: "Hello, Farmer!",
      title2: "Welcome Back!",
      title3: "Ask me anything!",
      subtitle: "What can I help you with today?",
    },
    promptForm: {
      placeholder: "What is on your mind?",
      placeholders: [
        "What crops are best for sandy soil?",
        "Suggest drought-resistant options.",
        "How can I improve soil nitrogen?",
        "What should I plant after corn?",
        "Show me profitable crops for a cool climate.",
      ],
      send: "Send",
      disclaimer: "KrishiMitra can make mistakes. Consider checking important information.",
      startRecording: "Start recording",
      stopRecording: "Stop recording",
    },
    suggestions: [
      { title: "What are the most profitable crops for sandy loam soil?", prompt: "I have sandy loam soil and want to maximize profit." },
      { title: "How can I improve soil nitrogen in clay soil?", prompt: "What can I plant to improve soil nitrogen in clay soil?" },
      { title: "Show me drought-resistant crops for a short, cool growing season.", prompt: "Show me drought-resistant crops for a short, cool growing season." },
      { title: "Suggest crops that require minimal water.", prompt: "Suggest crops that require minimal water for a dry climate." },
      { title: "What are natural ways to control pests for corn?", prompt: "What are natural ways to control pests for corn?" },
    ],
    cropCard: {
        yield: "Yield",
        profitMargin: "Profit Margin",
        sustainability: "Sustainability",
        whyRecommended: "Why was this recommended?",
    },
    explainer: {
        title: "Why {{cropName}}?",
        description: "An AI-generated summary of the key factors behind this recommendation.",
        close: "Close",
    },
    errors: {
      errorTitle: "Error",
      noCropsFound: "The AI couldn't find any suitable crops based on your prompt. Please try adjusting the inputs.",
      unexpectedError: "An unexpected error occurred while getting recommendations. The AI model might have returned an unparsable response. Please check the console for details and try again.",
      failedToGetRecommendations: "Failed to get recommendations. Please try again.",
      failedToLoadExplanation: "Failed to load explanation. Please try again later.",
      couldNotFetchExplanation: "Could not fetch the explanation.",
    }
  },
  hi: {
    header: {
      newChat: "नई चैट",
      noChats: "कोई चैट इतिहास नहीं।",
      noChatsFound: "कोई चैट नहीं मिली।"
    },
    welcome: {
      title: "नमस्ते किसान!",
      title2: "वापसी पर स्वागत है!",
      title3: "मुझसे कुछ भी पूछें!",
      subtitle: "आज मैं आपकी क्या मदद कर सकता हूँ?",
    },
    promptForm: {
      placeholder: "आपके मन में क्या है?",
      placeholders: [
        "रेतीली मिट्टी के लिए कौन सी फसलें सबसे अच्छी हैं?",
        "सूखा-प्रतिरोधी विकल्प सुझाएं।",
        "मैं मिट्टी में नाइट्रोजन कैसे सुधार सकता हूं?",
        "मक्के के बाद मुझे क्या लगाना चाहिए?",
        "मुझे ठंडी जलवायु के लिए लाभदायक फसलें दिखाएं।",
      ],
      send: "भेजें",
      disclaimer: "कृषि मित्र गलतियाँ कर सकता है। महत्वपूर्ण जानकारी की जाँच करने पर विचार करें।",
      startRecording: "रिकॉर्डिंग शुरू करें",
      stopRecording: "रिकॉर्डिंग बंद करें",
    },
    suggestions: [
      { title: "रेतीली दोमट मिट्टी के लिए सबसे अधिक लाभदायक फसलें कौन सी हैं?", prompt: "मेरे पास रेतीली दोमट मिट्टी है और मैं लाभ को अधिकतम करना चाहता हूं।" },
      { title: "चिकनी मिट्टी में मिट्टी के नाइट्रोजन को कैसे सुधारें?", prompt: "चिकनी मिट्टी में मिट्टी के नाइट्रोजन को बेहतर बनाने के लिए मैं क्या लगा सकता हूं?" },
      { title: "छोटे, ठंडे बढ़ते मौसम के लिए सूखा प्रतिरोधी फसलें दिखाएं।", prompt: "मुझे छोटे, ठंडे बढ़ते मौसम के लिए सूखा प्रतिरोधी फसलें दिखाएं।" },
      { title: "न्यूनतम पानी की आवश्यकता वाली फसलें सुझाएं।", prompt: "शुष्क जलवायु के लिए न्यूनतम पानी की आवश्यकता वाली फसलें सुझाएं।" },
      { title: "मक्के के कीटों को नियंत्रित करने के प्राकृतिक तरीके क्या हैं?", prompt: "मक्के के लिए कीटों को नियंत्रित करने के प्राकृतिक तरीके क्या हैं?" },
    ],
    cropCard: {
        yield: "उपज",
        profitMargin: "लाभ मार्जिन",
        sustainability: "स्थिरता",
        whyRecommended: "यह अनुशंसा क्यों की गई?",
    },
    explainer: {
        title: "{{cropName}} क्यों?",
        description: "इस अनुशंसा के पीछे प्रमुख कारकों का एआई-जनित सारांश।",
        close: "बंद करें",
    },
    errors: {
        errorTitle: "त्रुटि",
        noCropsFound: "एआई को आपके प्रॉम्प्ट के आधार पर कोई उपयुक्त फसल नहीं मिली। कृपया इनपुट समायोजित करने का प्रयास करें।",
        unexpectedError: "सिफारिशें प्राप्त करते समय एक अप्रत्याशित त्रुटि हुई। हो सकता है कि AI मॉडल ने एक अपार्सनीय प्रतिक्रिया दी हो। कृपया विवरण के लिए कंसोल देखें और फिर से प्रयास करें।",
        failedToGetRecommendations: "सिफारिशें प्राप्त करने में विफल। कृपया पुन: प्रयास करें।",
        failedToLoadExplanation: "स्पष्टीकरण लोड करने में विफल। कृपया बाद में पुन: प्रयास करें।",
        couldNotFetchExplanation: "स्पष्टीकरण प्राप्त नहीं हो सका।",
    }
  },
  mr: {
    header: {
      newChat: "नवीन चॅट",
      noChats: "चॅट इतिहास नाही.",
      noChatsFound: "कोणतेही चॅट आढळले नाहीत."
    },
    welcome: {
      title: "नमस्कार, शेतकरी!",
      title2: "पुन्हा स्वागत आहे!",
      title3: "मला काहीही विचारा!",
      subtitle: "आज मी तुमची काय मदत करू शकतो?",
    },
    promptForm: {
      placeholder: "तुमच्या मनात काय आहे?",
      placeholders: [
        "वाळूमिश्रित जमिनीसाठी कोणती पिके सर्वोत्तम आहेत?",
        "दुष्काळ-प्रतिरोधक पर्याय सुचवा.",
        "मी जमिनीतील नायट्रोजन कसे सुधारू शकतो?",
        "मक्यानंतर काय लावावे?",
        "थंड हवामानासाठी मला फायदेशीर पिके दाखवा.",
      ],
      send: "पाठवा",
      disclaimer: "कृषिमित्र चुका करू शकते. महत्वाची माहिती तपासण्याचा विचार करा.",
      startRecording: "रेकॉर्डिंग सुरू करा",
      stopRecording: "रेकॉर्डिंग थांबवा",
    },
    suggestions: [
        { title: "वाळूमिश्रित चिकणमातीसाठी सर्वात फायदेशीर पिके कोणती आहेत?", prompt: "माझ्याकडे वाळूमिश्रित चिकणमाती आहे आणि मला नफा वाढवायचा आहे." },
        { title: "चिकणमातीमध्ये नायट्रोजन कसे सुधारावे?", prompt: "चिकणमातीमध्ये नायट्रोजन सुधारण्यासाठी मी काय लावू शकतो?" },
        { title: "लहान, थंड वाढत्या हंगामासाठी दुष्काळ-प्रतिरोधक पिके दाखवा.", prompt: "मला लहान, थंड वाढत्या हंगामासाठी दुष्काळ-प्रतिरोधक पिके दाखवा." },
        { title: "किमान पाण्याची गरज असलेली पिके सुचवा.", prompt: "कोरड्या हवामानासाठी कमीतकमी पाण्याची आवश्यकता असलेली पिके सुचवा." },
        { title: "मक्यावरील कीड नियंत्रणाचे नैसर्गिक मार्ग कोणते?", prompt: "मक्यावरील कीड नियंत्रणाचे नैसर्गिक मार्ग कोणते?" },
    ],
    cropCard: {
        yield: "उत्पन्न",
        profitMargin: "नफा मार्जिन",
        sustainability: "शाश्वतता",
        whyRecommended: "ही शिफारस का केली गेली?",
    },
    explainer: {
        title: "{{cropName}} का?",
        description: "या शिफारशीमागील प्रमुख घटकांचा AI-व्युत्पन्न सारांश.",
        close: "बंद करा",
    },
    errors: {
        errorTitle: "त्रुटी",
        noCropsFound: "AI ला तुमच्या प्रॉम्प्टवर आधारित कोणतीही योग्य पिके सापडली नाहीत. कृपया इनपुट समायोजित करण्याचा प्रयत्न करा.",
        unexpectedError: "शिफारसी मिळवताना एक अनपेक्षित त्रुटी आली. AI मॉडेलने कदाचित एक ناقابل प्रतिक्रिया दिली असेल. कृपया तपशीलांसाठी कन्सोल तपासा आणि पुन्हा प्रयत्न करा.",
        failedToGetRecommendations: "शिफारसी मिळविण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.",
        failedToLoadExplanation: "स्पष्टीकरण लोड करण्यात अयशस्वी. कृपया नंतर पुन्हा प्रयत्न करा.",
        couldNotFetchExplanation: "स्पष्टीकरण मिळू शकले नाही.",
    }
  },
};
