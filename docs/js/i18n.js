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
            "LoadingVideo": "⌛ Loading video...",
            "OpenThisLink?": "Do you want to open this link?",
            "CallThisNumber?": "Call this number?",
            "SendMail?": "Send an email?",
            "RunThisBookmarklet?": "Run this bookmarklet?",
            "OpenThisApps?": "Open this app?",
        },
        // Japanese
        "ja": {
            "title": "Fire QRコードリーダー",
            "loadingMessage": "🎥 ビデオストリームにアクセスできません。",
            "outputData": "検出中...",
            "LoadingVideo": "⌛ ビデオをロード中...",
            "OpenThisLink?": "このリンクを開きますか？",
            "CallThisNumber?": "この番号に電話しますか？",
            "SendMail?": "メールを送信しますか？",
            "RunThisBookmarklet?": "このブックマークレットを実行しますか？",
            "OpenThisApps?": "このアプリを開きますか？",
        },
        // Spanish
        "es": {
            "title": "Lector de códigos QR",
            "loadingMessage": "🎥 No se puede acceder al flujo de vídeo (asegúrese de que tiene una cámara web habilitada).",
            "outputData": "Detectar...",
            "LoadingVideo": "⌛ Cargando vídeo...",
            "OpenThisLink?": "¿Quieres abrir este enlace?",
            "CallThisNumber?": "¿Llamar a este número?",
            "SendMail?": "¿Enviar un correo electrónico?",
            "RunThisBookmarklet?": "¿Ejecutar este bookmarklet?",
            "OpenThisApps?": "¿Abrir esta aplicación?",
        },
        // Russian
        "ru": {
            "title": "Считыватель пожарных QR-кодов",
            "loadingMessage": "🎥 Невозможно получить доступ к видеопотоку (убедитесь, что у вас включена веб-камера)",
            "outputData": "Обнаружение...",
            "LoadingVideo": "⌛ Загрузка видео...",
            "OpenThisLink?": "",
            "CallThisNumber?": "",
            "SendMail?": "",
            "RunThisBookmarklet?": "",
            "OpenThisApps?": "",
        },
        // French
        "fr": {
            "title": "Lecteur de code QR",
            "loadingMessage": "🎥 Impossible d'accéder au flux vidéo (assurez-vous que votre webcam est activée)",
            "outputData": "Détecter...",
            "LoadingVideo": "⌛ Chargement de la vidéo...",
            "OpenThisLink?": "Вы хотите открыть эту ссылку?",
            "CallThisNumber?": "Позвонить по этому номеру?",
            "SendMail?": "Отправить электронное сообщение?",
            "RunThisBookmarklet?": "Запустить этот букмарклет?",
            "OpenThisApps?": "Открыть это приложение?",
        },
        // German
        "de": {
            "title": "QR-Code-Leser abfeuern",
            "loadingMessage": "🎥 Zugriff auf Videostream nicht möglich (bitte stellen Sie sicher, dass Sie eine Webcam aktiviert haben)",
            "outputData": "Aufspüren...",
            "LoadingVideo": "⌛ Video wird geladen...",
            "OpenThisLink?": "Möchten Sie diesen Link öffnen?",
            "CallThisNumber?": "Diese Nummer anrufen?",
            "SendMail?": "Eine E-Mail senden?",
            "RunThisBookmarklet?": "Dieses Bookmarklet ausführen?",
            "OpenThisApps?": "Diese App öffnen?",
        },
        // Chinese
        "zh": {
            "title": "消防二维码阅读器",
            "loadingMessage": "🎥 无法访问视频流（请确保你有一个网络摄像头启用）。",
            "outputData": "探测...",
            "LoadingVideo": "⌛ 正在加载视频...",
            "OpenThisLink?": "你想打开这个链接吗？",
            "CallThisNumber?": "拨打这个号码？",
            "SendMail?": "发送电子邮件？",
            "RunThisBookmarklet?": "运行这个小书签？",
            "OpenThisApps?": "打开这个应用程序？",
        },
        // korean
        "ko": {
            "title": "Fire QR 코드 리더",
            "loadingMessage": "🎥 동영상 스트림에 액세스할 수 없습니다(웹캠이 활성화되어 있는지 확인하세요).",
            "outputData": "감지 중...",
            "LoadingVideo": "⌛ 동영상 로드 중...",
            "OpenThisLink?": "이 링크를 열어보시겠습니까?",
            "CallThisNumber?": "이 번호로 전화하시겠습니까?",
            "SendMail?": "이메일을 보내시겠습니까?",
            "RunThisBookmarklet?": "이 북마크릿을 실행하시겠습니까?",
            "OpenThisApps?": "이 앱을 열겠습니까?",
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
