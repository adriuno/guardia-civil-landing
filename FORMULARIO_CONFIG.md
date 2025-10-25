# Configuración del Formulario de Contacto

## ⚠️ IMPORTANTE: Configurar el endpoint del formulario

El archivo `script.js` tiene una variable `CONFIG.formEndpoint` que debes configurar.

### Opciones recomendadas:

#### 1. **FormSubmit.co (Más fácil - Sin backend)**
```javascript
// En script.js, línea 7, cambia:
formEndpoint: 'https://formsubmit.co/ajax/TU_EMAIL_AQUI@gmail.com'
```

**Ventajas:**
- ✅ Gratuito
- ✅ Sin backend necesario
- ✅ Fácil de configurar
- ✅ Protección anti-spam incluida

**Pasos:**
1. Reemplaza `YOUR_FORM_ENDPOINT_HERE` con la URL de FormSubmit
2. La primera vez que recibas un email, deberás confirmar tu dirección

#### 2. **EmailJS (Recomendado - Más profesional)**
```javascript
// Usa EmailJS SDK
// https://www.emailjs.com/
```

**Ventajas:**
- ✅ Gratuito hasta 200 emails/mes
- ✅ Templates personalizables
- ✅ No expone tu email en el código

#### 3. **Backend propio (PHP/Node.js)**
Crea un archivo `contact.php` o endpoint de Node.js que envíe emails.

---

## 🔒 Seguridad

**NO** expongas tu email directamente en el código JavaScript como estaba antes:
```javascript
// ❌ MALO - Email visible para bots
fetch('https://formsubmit.co/ajax/prepa.fisicas.guardias@gmail.com', ...)
```

**SÍ** usa una configuración separada o variable de entorno:
```javascript
// ✅ BUENO - Email oculto
formEndpoint: 'YOUR_FORM_ENDPOINT_HERE'
```

---

## 📋 Checklist de configuración:

- [ ] Cambiar `YOUR_FORM_ENDPOINT_HERE` en `script.js` línea 7
- [ ] Probar el formulario enviando un mensaje de prueba
- [ ] Verificar que los emails lleguen correctamente
- [ ] Configurar protección anti-spam si es necesario

---

## 🚀 Próximos pasos:

1. Abre `script.js`
2. Busca la línea 7: `formEndpoint: 'YOUR_FORM_ENDPOINT_HERE'`
3. Reemplázala con tu endpoint elegido
4. Guarda y prueba el formulario
