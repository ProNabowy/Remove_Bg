class App
{
    constructor()
    {
        this.API_URL = "https://api.remove.bg/v1.0/removebg";
        this.API_Key = "fr886eKVRgVqsUWFdVsz2Kn2";
        this.uploadeImage = document.getElementById("uploadeImage");
        this.startRemoveBG = document.getElementById("startRemoveBG");
        this.loaderScreen = document.getElementById("loaderScreen");
        this.RemoveBGResult = document.getElementById("RemoveBGResult");
        this.uploadeInput = document.getElementById("uploadeImageInput");
        this.startRemoveBgImage = document.getElementById("startRemoveBGImage");
        this.imageResult = document.getElementById("imgResult");
        this.smImage = document.getElementById("sm-img");
        this.startRemoveBGBtn = document.getElementById("startBtn");
        this.downloadResult = document.getElementById("downloadResult");
        this.uploadeAnother = document.getElementById("uploadeAnother");
        this.fileReader = new FileReader();
        this.formData = new FormData();
        this.file = null;
    }

    changeScreen(currentScreen)
    {
        let screens = [this.uploadeImage, this.startRemoveBG, this.loaderScreen, this.RemoveBGResult];
        screens.forEach(screen => screen.style.display = "none");
        currentScreen.style.display = "block";
    }

    uploadeFile()
    {
        this.uploadeInput.addEventListener("change", () =>
        {
            this.file = this.uploadeInput.files[0];
            this.fileReader.readAsDataURL(this.file);
            this.fileReader.onloadend = () =>
            {
                const imageType = this.uploadeInput.files[0].name.slice(this.uploadeInput.files[0].name.indexOf(".") + 1).toLowerCase();
                this.checkImageType(imageType);
                this.startRemoveBgImage.src = this.fileReader.result;
                this.smImage.src = this.fileReader.result;
                this.changeScreen(this.startRemoveBG);
            }
        });
    }

    startBtnEvent()
    {
        this.startRemoveBGBtn.addEventListener("click", () =>
        {
            this.changeScreen(this.loaderScreen);
            this.fetchAPI();
            this.uploadeAnotherImage();
        });
    }

    fetchAPI()
    {
        this.formData.append("image_file", this.file);
        fetch(this.API_URL, {
            method: "POST",
            headers: {
                'X-Api-Key': this.API_Key
            },
            body: this.formData
        }).then(response =>
        {
            return response.blob();
        }).then(data =>
        {
            this.file = data;
            this.fileReader.readAsDataURL(this.file);
            this.fileReader.onloadend = () =>
            {
                this.downloadResult.setAttribute("href", this.fileReader.result);
                this.imageResult.src = this.fileReader.result;
                this.changeScreen(this.RemoveBGResult);
            }
        });
    }

    uploadeAnotherImage()
    {
        this.uploadeAnother.addEventListener("click", () => window.location.reload());
    }

    checkImageType(imageType)
    {
        const arrOfTypes = ["pjp", "jpg", "pjpeg", "jpeg", "jfif", "png", "jpg", "jpeg", "png"];
        let confiremBtn = document.querySelector(".swal2-confirm");
        console.log(confiremBtn)
        if (!arrOfTypes.includes(imageType))
        {
            Swal.fire(
                'Sorry..',
                'Our Applaction Doesn\'t Support This File Type',
                'question'
            ).then(result =>
            {
                if (result.isConfirmed) window.location.reload();
            })
        }
    }


}

const app = new App();

app.changeScreen(app.uploadeImage);
app.uploadeFile();
app.startBtnEvent();