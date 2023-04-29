using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    //[Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepo _repo;
        private readonly IMapper _mapper;

        public UsersController(IUserRepo repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
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

        [HttpGet("username/{username}")]
        public async Task<ActionResult<MemberDto>> getuserbyusername(string username)
        {


            return await _repo.GetMemberByNameAsync(username);

        }


    }
}