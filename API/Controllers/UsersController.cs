using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepo _repo;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public UsersController(IUserRepo repo, IMapper mapper, IPhotoService photoService)
        {
            _repo = repo;
            _mapper = mapper;
            _photoService = photoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUser()
        {

            return Ok(await _repo.GetMemberAsync());
        }
        //api/users/3
        [HttpGet("{id}")]
        public async Task<ActionResult<MemberDto>> getuserbyid(int id)
        {
            var user = await _repo.GetUserByIdAsync(id);
            var UserToReturn = _mapper.Map<MemberDto>(user);

            return UserToReturn;
        }

        [HttpGet("username/{username}", Name = "GetUser")]
        public async Task<ActionResult<MemberDto>> getuserbyusername(string username)
        {


            return await _repo.GetMemberByNameAsync(username);

        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var user = await _repo.GetUserByUserNameAsync(User.GetUserName());

            _mapper.Map(memberUpdateDto, user);

            _repo.UpdateUsers(user);

            if (await _repo.SaveAllAsync()) return NoContent();

            return BadRequest("Faild To Update User");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var user = await _repo.GetUserByUserNameAsync(User.GetUserName());

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (user.Photos.Count == 0)
            {
                photo.IsMain = true;

            }

            user.Photos.Add(photo);

            if (await _repo.SaveAllAsync())
            {

                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<PhotoDto>(photo));
            }

            return BadRequest("problem adding photo");

        }
        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            var user = await _repo.GetUserByUserNameAsync(User.GetUserName());

            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo.IsMain) return BadRequest("this is already your main request");

            var currentMain = user.Photos.FirstOrDefault(x => x.IsMain == true);

            if (currentMain != null) currentMain.IsMain = false;

            photo.IsMain = true;

            if (await _repo.SaveAllAsync()) return NoContent();


            return BadRequest("faild to set main photo");
        }
        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var user = await _repo.GetUserByUserNameAsync(User.GetUserName());

            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);
            if (photo == null) return NotFound();

            if (photo.IsMain) return BadRequest("You cant delete your main photo");

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);

                if (result.Error != null) return BadRequest(result.Error.Message);

            }
            user.Photos.Remove(photo);

            if (await _repo.SaveAllAsync()) return Ok();

            return BadRequest("falid to delete the photo");
        }




    }
}