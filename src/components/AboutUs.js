import { FaFacebookF, FaGithub, FaTwitter } from 'react-icons/fa'

const AboutUs = () => {
    return (
        <section className="about">
            <div className="aboutUsContainer">
                <div className="innerContainer">
                    <h1>About Us</h1>
                    <p className="text">
                        Goodlistens provides the top rated songs for you. It provides you with the details
                        for Artists, Album name, rating given by other Listeners.
                    </p>
                    <p className="text">
                        If you wanna listen to your favourite song just click on the headphone button which directly
                        takes you to spotify web to enjoy your music.

                    </p>
                    <h2>Contact Us On</h2>
                    <div className="container-fluid" >
                        <a href="https://github.com/Anurag-Saraswat-01/D12A_IP_GoodListens" target="_blank" rel="noopener noreferrer"
                            style={{ color: "white" }}></a>
                        <FaGithub className="icons" size={30} />
                        <FaFacebookF className="icons" size={30} />
                        <FaTwitter className="icons" size={30} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs
