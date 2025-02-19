// const URL_SERVER ="https://66d901d94ad2f6b8ed533858.mockapi.io";
const URL_SERVER ="http://localhost:3000";
// const URL_SERVER ="http://192.168.1.25:3000";
const TOKEN = 'Token';
class Cookie {
    setCookie(nombre, valor, dias) {
        let expires = "";
        if (dias) {
            const date = new Date();
            date.setTime(date.getTime() + (dias * 24 * 60 * 60 * 1000)); // Convertir días a milisegundos
            expires = `; expires=${date.toUTCString()}`;
        }
        document.cookie = `${nombre}=${valor || ""}${expires}; path=/`;
    }

    // Método para obtener el valor de una cookie
    getCookieValue(nombre) {
        const cookies = document.cookie.split(";"); // Divide la cadena de cookies en un array
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim(); // Elimina espacios en blanco al principio y al final
            if (cookie.startsWith(nombre + "=")) {
                return cookie.substring(nombre.length + 1); // Retorna el valor de la cookie
            }
        }
        return null; // Si no se encuentra la cookie, retorna null
    }

    // Método para cifrar y almacenar una cookie
    setEncryptedCookie(nombre, valor, dias) {
        const encryptedValue = btoa(valor); // Cifrar usando Base64
        this.setCookie(nombre, encryptedValue, dias);
    }

    // Método para obtener y descifrar una cookie
    getDecryptedCookie(valor) {
        const encryptedValue = this.getCookieValue(valor);
        //console.log(encryptedValue);
        if (encryptedValue) {
            return atob(encryptedValue); // Descifrar usando Base64
        }
        return null;
    }
}

const cookieManager = new Cookie();
const cookieToken  = new Cookie();
//export default cookieManager;
window.cookieManager = cookieManager;
window.cookieToken= cookieToken;

