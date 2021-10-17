<<<<<<< HEAD
import { FaFacebookF, FaGithub, FaTwitter } from 'react-icons/fa'

=======
// import { Container } from "react-bootstrap"
>>>>>>> 87ad90b4908fca970be3b1a748b5cbb10610384e

const AboutUs = () => {
    return (
        <section className="about">
            <div className="aboutUsContainer">
                <div className="innerContainer">
                    <h1>About Us</h1>
<<<<<<< HEAD
                    <p class="text">
                        Goodlistens provides the top rated songs for you. It provides you with the details
                        for Artists, Album name, rating given by other Listeners.
                        {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has                         
                        been the industry's standard dummy text ever since the 1500s, when an unknown printer took 
                        a galley of type and scrambled it to make a type specimen book. It has survived not only five
                        centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                        It was popularised in the 1960s with the release of Letraset sheets containing  */}
                    </p>
                    <p class="text">
                        If you wanna listen to your favourite song just click on the headphone button which directly
                        takes you to spotify web to enjoy your music.

=======
                    <p className="text">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula
                        eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient
                        montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu,
                        pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
                        aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                        venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer
                        tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend
                        tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
                        Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
                        viverra nulla ut
>>>>>>> 87ad90b4908fca970be3b1a748b5cbb10610384e
                    </p>
                    <h2>Connect Us On</h2>
                    <div className="container-fluid" >
                        <FaFacebookF className="icons" size={30} />
                        <FaGithub className="icons" size={30} />
                        <FaTwitter className="icons" size={30} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutUs
