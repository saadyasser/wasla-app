<?php

namespace App\Exceptions;

use Exception;

class UnsupportedRoleException extends Exception
{
     public function __construct(string $message = "The user role is not supported.", int $code = 0, ?Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
