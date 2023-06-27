/**
 * internationalization library class
 *
 * @class i18n
 */
export default class i18n {
    /**
     *  @var dictionaries Multilingual dictionary object
     */
    static dictionaries = {
        // English
        "en": {
            "title": "Fire QR code Reader",
            "loadingMessage": "🎥 Unable to access video stream (please make sure you have a webcam enabled)",
            "outputData": "Detecting...",
        },
        // Japanese
        "ja": {
            "title": "Fire QRコードリーダー",
            "loadingMessage": "🎥 ビデオストリームにアクセスできません。",
            "outputData": "検出中...",
        },
        // Spanish
        "es": {
            "title": "Lector de códigos QR",
            "loadingMessage": "🎥 No se puede acceder al flujo de vídeo (asegúrese de que tiene una cámara web habilitada).",
            "outputData": "Detectar...",
        },
        // Russian
        "ru": {
            "title": "Считыватель пожарных QR-кодов",
            "loadingMessage": "🎥 Невозможно получить доступ к видеопотоку (убедитесь, что у вас включена веб-камера)",
            "outputData": "Обнаружение...",
        },
        // French
        "fr": {
            "title": "Lecteur de code QR",
            "loadingMessage": "🎥 Impossible d'accéder au flux vidéo (assurez-vous que votre webcam est activée)",
            "outputData": "Détecter...",
        },
        // German
        "de": {
            "title": "QR-Code-Leser abfeuern",
            "loadingMessage": "🎥 Zugriff auf Videostream nicht möglich (bitte stellen Sie sicher, dass Sie eine Webcam aktiviert haben)",
            "outputData": "Aufspüren...",
        },
        // Chinese
        "zh": {
            "title": "消防二维码阅读器",
            "loadingMessage": "🎥 无法访问视频流（请确保你有一个网络摄像头启用）。",
            "outputData": "探测...",
        },
        // korean
        "ko": {
            "title": "Fire QR 코드 리더",
            "loadingMessage": "🎥 동영상 스트림에 액세스할 수 없습니다(웹캠이 활성화되어 있는지 확인하세요).",
            "outputData": "감지 중...",
        },
    }

    /**
     * Get the browser's display language
     * @returns {string} Current language
     */
    static lang() {
        const wn = window.navigator;
        return ((wn.languages && wn.languages[0]) || wn.language || wn.userLanguage || wn.browserLanguage).slice(0, 2);
    }

    /**
     * Get current language
     * @returns {string} Current language
     */
    static language() {
        const lang = this.lang();

        // Show English for undefined languages
        return this.dictionaries[lang] ? lang : "en";
    }

    /**
     * Get translated term
     * @param {string} term Term to be translated
     * @returns {string} Translated term
     */
    static translate(index) {
        return this.dictionaries[this.language()][index];
    }

    /**
     * Initialization of dictionary object
     */
    static translateAll() {
        const dictionary = this.dictionaries[this.language()];
        for (let elem of document.querySelectorAll('[data-translate]')) {
            elem.innerHTML = dictionary[elem.dataset.translate];
        }
    }
}
