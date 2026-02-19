<?php

namespace App\Actions\Administrators;

use App\Services\TokenService;
use App\Services\UserService;
use App\Utils\TokenUtils;
use Psr\Http\Message\ResponseInterface;
use Slim\Psr7\Request;
use Slim\Psr7\Response;

/**
 * Action qui déclenche une réinitialisation de fin d'évènement.
 * @author Nathan Reyes
 */
class PostResetAnnualDataAction
{
    public function __construct(private UserService $userService, private TokenService $tokenService) {}

    public function __invoke(Request $request, Response $response, array $args): ResponseInterface
    {
        $isUserPermitted = TokenUtils::is_user_in_permitted_roles($request, $this->tokenService, ["Admin"]);
        if ($isUserPermitted !== null) {
            $response->getBody()->write($isUserPermitted->to_json());
            return $response->withStatus($isUserPermitted->get_http_code());
        }

        $serviceResponse = $this->userService->reset_annual_data();
        $response->getBody()->write($serviceResponse->to_json());
        return $response->withStatus($serviceResponse->get_http_code());
    }
}
