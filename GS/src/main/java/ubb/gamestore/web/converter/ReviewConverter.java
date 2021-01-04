package ubb.gamestore.web.converter;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ubb.gamestore.core.domain.Review;
import ubb.gamestore.core.domain.Wishlist;
import ubb.gamestore.web.dto.ReviewDTO;
import ubb.gamestore.web.dto.WishlistDTO;

@Component
public class ReviewConverter extends BaseConverter<Review, ReviewDTO> {
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Review convertDtoToModel(ReviewDTO dto) {
        Review review = modelMapper.map(dto, Review.class);
        review.setId(dto.getId());
        return review;
    }

    @Override
    public ReviewDTO convertModelToDto(Review review) {
        ReviewDTO reviewDTO = modelMapper.map(review, ReviewDTO.class);
        reviewDTO.setId(review.getId());
        return reviewDTO;
    }
}
