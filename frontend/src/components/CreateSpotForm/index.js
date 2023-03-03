import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postSpot,  fetchSpots } from '../../store/spots';
import { addSpotImage } from '../../store/Images';



function CreateSpotForm() {
     const dispatch = useDispatch()
     const history = useHistory()
    // states
    const [csrfToken, setCsrfToken] = useState('')

    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(1);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');



     
 const handleInputChange = (e) => {
    const {name, value} = e.target;
    switch (name){
        case 'name':
            setName(value)
            break;
        case 'description':
            setDescription(value)
            break;
        case 'price':
            setPrice(value)
            break;
        case 'address':
            setAddress(value)
            break;
        case 'city':
            setCity(value)
            break;
        case 'state':
            setState(value)
            break;
        case 'country':
            setCountry(value)
            break;
            default:
                return
        
        
        
            
    }
 }
 

   

      const handleImageChange =  (e) => {
        const {name, value} = e.target;
        switch(name){
            case 'previewImage':
                setPreviewImage(value)
                break;
            case 'image1':
                setImage1(value)
                break
            case 'image2':
                 setImage2(value)
                 break
            case 'image3':
                setImage3(value)
                break
            case 'image4':
                setImage4(value)
                break
            default:
                return
        }
          
      
      };
   
      const handleSubmit = async (e) => {
        e.preventDefault();

        
    const formData = {
        name,
        description,
        price,
        address,
        city,
        state,
        country,
        images: [previewImage, image1, image2, image3, image4],
        };
      
        
        const createdSpot = await dispatch(postSpot(formData));
        
        if (createdSpot) {
          const spotId = createdSpot.id;
      
          formData.images.forEach(async (imageUrl, index) => {
            if (imageUrl.trim() !== '') {
                await dispatch(addSpotImage(spotId, imageUrl, index));
              }
            });
          
      
          dispatch(fetchSpots());
          history.push(`/spots/${spotId}`);
        }
      };
 
    return (
        <form className="spot-form" onSubmit={handleSubmit}>
             <input type="hidden" name="_csrf" value={csrfToken} />
            <div>
                <h2>Create a new Spot</h2>
                <label>Where's your place located?</label>
                <p>Guests will only get your exact address once they booked a
                    reservation.</p>
            </div>
            <div>
                <label htmlFor="country">Country</label>
                <input
                    type="text"
                    name="country"
                    placeholder='Country' 
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    name='address'
                    placeholder='Address' 
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    name="city"
                    placeholder='City' 
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="state">State</label>
                <input
                    type="text"
                    name="state"
                    placeholder='State' 
                    onChange={handleInputChange}
                    required
                />
            </div>
          
                    <div>
                        <label htmlFor="description">Describe your place to guests</label>
                        <p>Mention the best features of your space, any special amentities like
                            fast wif or parking, and what you love about the neighborhood.</p>
                        <textarea
                            name='description'
                            placeholder='Please write at least 30 characters' 
                            onChange={handleInputChange}
                            required
                        >
                        </textarea>
                    </div>
                    <div>
                        <label> Create a title for your spot </label>
                        <p>Catch guests' attention with a spot title that highlights what makes
                            your place special.
                        </p>
                        <input
                            type='text'
                           name="name"
                           placeholder='Name of your spot' 
                            onChange={handleInputChange}
                            required

                        />



                    </div>

                    <div>
                        <label htmlFor="price">Set a base price for your spot</label>
                        <p>Competitive pricing can help your listing stand out and rank higher
                            in search results</p>
                        <input
                            type="number"
                            name="price"
                            placeholder='Price per night (USD)' 
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                        <div>
                            <label htmlFor='spotImages'>Liven up your spot with photos</label>
                            <p>Submit a link to at least one photo to publish your spot</p>
                            <input 
                                type='text'
                                name='previewImage'
                                placeholder='Preview Image URL'
                                onChange={handleImageChange}
                                required
                            />
                              <input 
                                type='text'
                                name='image1'
                                placeholder='Image URL'
                                onChange={handleImageChange}
                               
                            />
                                <input 
                                type='text'
                                name='image2'
                                placeholder='Image URL'
                                onChange={handleImageChange}
                               
                            />
                                <input 
                                type='text'
                                name='image3'
                                placeholder='Image URL'
                                onChange={handleImageChange}
                               
                            />
                                <input 
                                type='text'
                                name='image4'
                                placeholder='Image URL'
                                onChange={handleImageChange}
                               
                            />

                        </div>
              
            <button type='submit'>Create Spot</button>

        </form>

    )
}



export default CreateSpotForm
